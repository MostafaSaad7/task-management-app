module.exports = wrappedFunction => {
  return (req, res, next) => {
    wrappedFunction(req, res, next).catch(next);
  };
};
