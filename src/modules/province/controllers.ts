import provinceServices from './services';

const getList = async (req, res) => {
  const provices = await provinceServices.getList();
  return res.status(200).json({
    status: 'success',
    result: provices,
  });
};

const provinceControllers = {
  getList,
};

export default provinceControllers;
