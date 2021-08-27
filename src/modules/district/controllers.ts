import districtServices from './services';

const getList = async (req, res) => {
  const provinceId = req.query.provinceId;
  const districts = await districtServices.getList(provinceId);
  return res.status(200).json({
    status: 'success',
    result: districts,
  });
};

const districtControllers = {
  getList,
};

export default districtControllers;
