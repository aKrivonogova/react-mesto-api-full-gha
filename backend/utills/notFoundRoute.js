const notFoundError = (req, res) => res.status(404).send({ message: 'такой страницы не существует!' });

module.exports = notFoundError;
