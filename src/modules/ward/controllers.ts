import wardServices from './services';

const getList = async (req, res) => {
  const districtId = req.query.districtId;
  const wards = await wardServices.getList(districtId);
  return res.status(200).json({
    status: 'success',
    result: wards,
  });
};

const wardControllers = {
  getList,
};

export default wardControllers;
