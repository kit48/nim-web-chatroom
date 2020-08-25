export default {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  disableTypeCheck: true,
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
  // runtimeHelpers: true,
};
