exports.getQuadrants = (req, res) => {
    const quadrants = [11, 12, 13, 14];
    res.status(200).json(quadrants);
  };
  