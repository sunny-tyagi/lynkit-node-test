const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Category = mongoose.model('Category'),
    Product = mongoose.model('Product'),
    async = require("async"),
    request = require('request'),
    fs = require('fs');

// validate and save/update the category, Promise A    
const saveCategories = async (category) => {
    return new Promise(async (resolve, reject) => {
        // Validate the category fields, If error then reject with an error
        if (typeof category !== "object") {
            reject({ status: 422, message: "Category should be a object" });
        } else if (!category.name) {
            reject({ status: 422, message: "Category name is missing" });
        }
        // Save the category in db, It will work update and insert in single query
        Category.updateOne({ name: category.name.trim(), isDelete: false }, {
            $set: category
        }, { upsert: true }).then(() => {
            // Promise A resolved
            resolve(category);
        }).catch((err) => {
            // Promise A rejected
            reject({ status: (err.httpStatusCode ? err.httpStatusCode : 500), message: "Oops! Unable to add categories" });
        })
    });
}

// validate user, Promise B    
const validateUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        // Validate the user fields, If error then reject with an error
        if (typeof user !== "object") {
            reject({ status: 422, message: "User should be a object" });
        } else if (!user.email || !user.firstName || !user.lastName || !Array.isArray(user.addresses)) {
            reject({ status: 422, message: "Required fields of user are missing" });
        }
        // It will find that any record exists with requested email if yes, then reject with an error  
        User.findOne({
            email: user.email.trim(),
            isDelete: false
        }).then((result) => {
            if (!result) {
                // Promise B resolved
                resolve(user);
            } else {
                // Promise B rejected
                reject({ status: 422, message: "Oops! Email already exist, please try with different email" });
            }
        }).catch((e) => {
            // Promise B rejected if found an error in the process
            reject({ status: (e.httpStatusCode ? e.httpStatusCode : 500), message: "Oops! Unable to add user" });
        })
    });
}

// validate product    
const validateProduct = async (product) => {
    return new Promise(async (resolve, reject) => {
        // Validate the product fields, If error then reject with an error and Promise C will be rejected
        if (typeof product !== "object") {
            reject({ status: 422, message: "Product should be a object" });
        } else if (!product.title || !product.size || isNaN(product.price)) {
            reject({ status: 422, message: "Required fields of product are missing" });
        } else if (product.price < 50) { // minimum price would be 50 ruppes 
            reject({ status: 400, message: "You can't add product having price less than 50" });
        }
        // Promise C resolved
        resolve(product);
    });
}

//  Ques-1
// add the category, user, product 
const addDetails = async (req, res, next) => {
    try {
        // validate the basic required fields
        if (!req.body.category || !req.body.user || !req.body.product) {
            return res.status(422).json({ errors: { message: "Required fields are missing" } });
        }
        return Promise.all([
            // Promise A
            saveCategories(req.body.category)
        ]).then(() => {
            Promise.all([ //  Promise B and C will be executed in parallel
                // Promise B
                validateUser(req.body.user),
                // Promise C
                validateProduct(req.body.product)
            ]).then((validatedData) => {
                // Promise D
                (function saveUserAndProduct(user, product) {
                    try {
                        // Apply 10% charges of application 
                        const actualPrice = product.price + parseInt((10 * product.price) / 100);
                        product.price++;
                        // Promise E
                        if (actualPrice % 5 === 0) {
                            new Product(product).save().then(() => {
                                new User(user).save().then(() => {
                                    return res.status(200).json({ message: "All data saved successfully" });
                                }).catch((error) => {
                                    return res.status(error.httpStatusCode ? error.httpStatusCode : 500).json({ errors: { message: (error.message ? error.message : "Oops! Something went wrong, please try again") } });
                                })
                            }).catch((er) => {
                                return res.status(er.httpStatusCode ? er.httpStatusCode : 500).json({ errors: { message: (er.message ? er.message : "Oops! Something went wrong, please try again") } });
                            })
                        } else {
                            // If error occurs in promise E then again Promise D will be called till E is resolved 
                            saveUserAndProduct(user, product);
                        }
                    } catch (err) {
                        return res.status(err.httpStatusCode ? err.httpStatusCode : 500).json({ errors: { message: (err.message ? err.message : "Oops! Something went wrong, please try again") } });
                    }
                })(...validatedData);
            }).catch(next);
        }).catch(next);
    } catch (e) {
        return res.status(e.httpStatusCode ? e.httpStatusCode : 500).json({ errors: { message: (e.message ? e.message : "Oops! Something went wrong, please try again") } });
    }
}

// Ques-3 (A)
// read data from user collection having nested documents. 
const getUsersDetails = async (req, res, next) => {
    try {
        User.find({
            'addresses.city': { $regex: new RegExp(req.query.city, "i") },
            isDelete: false
        }).then((result) => {
            if (!result.length) {
                return res.status(404).json({ message: "Users does not found for this city!" });
            } else {
                return res.status(200).json({ message: "Users detail fetched successfully!", users: result });
            }
        }).catch(next);
    } catch (e) {
        return res.status(e.httpStatusCode ? e.httpStatusCode : 500).json({ errors: { message: (e.message ? e.message : "Oops! Something went wrong, please try again") } });
    }
}

// Ques-2
// Fetch data from mentioned urls and append to the single file. 
const getAndAppendData = async (req, res, next) => {
    try {
        const urlArray = [
            'https://data.ct.gov/api/views/rybz-nyjw/rows.json?accessType=DOWNLOAD',
            'https://data.townofcary.org/api/v2/catalog/datasets/rdu-weather-history',
            'https://data.ct.gov/api/views/rybz-nyjw/rows.json?accessType=DOWNLOAD',
            'https://api.github.com/users/mralexgray/repos'
        ];

        async.eachSeries(urlArray, function (url, next) {
            (async () => {
                console.log()
                let options = {
                    method: 'GET',
                    url: url,
                    headers: {
                        accept: 'application/json',
                        'User-Agent': 'Mozilla/5.0' // required for github and trusted urls for allow the permission to fetch data
                    }
                };
                request(options, function (error, response, body) {
                    if (error && response && (response.statusCode !== 200)) {
                        next(error);
                    } else {
                        // append fetched data to the file name "sample.txt"
                        fs.appendFile('public/sample.txt', body, 'utf8', function (err) {
                            if (err) {
                                next(err);
                            };
                            // if no error
                            next();
                        });
                    }
                });
            })();
        }, function (err) {
            if (err) {
                return res.status(err.httpStatusCode ? err.httpStatusCode : 500).json({ errors: { message: (err.message ? err.message : "Oops! Something went wrong, please try again") } });
            } else {
                return res.status(200).json({ message: "Data is appended to file successfully!" });
            }
        })
    } catch (e) {
        return res.status(e.httpStatusCode ? e.httpStatusCode : 500).json({ errors: { message: (e.message ? e.message : "Oops! Something went wrong, please try again") } });
    }
}

module.exports = {
    validateProduct,
    validateUser,
    saveCategories,
    validateUser,
    addDetails,
    getUsersDetails,
    getAndAppendData
}