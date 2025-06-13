module.exports = theFunc => (req,res,next) => {
    //Promise is the prebuilt class of javascript
  Promise.resolve(theFunc(req,res,next)).catch(next);
};