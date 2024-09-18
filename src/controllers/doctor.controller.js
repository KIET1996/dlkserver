exports.create = (req, resp) => {
    resp.send({ message: "create doctor" });
}

exports.findAll = (req, resp) => {
  resp.send({ message: "find doctor" });
};

exports.deleteAll = (req, resp) => {
  resp.send({ message: "delete doctor" });
};