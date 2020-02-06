var dataset = ee.ImageCollection('USGS/NLCD');
var NAIP = ee.ImageCollection('USDA/NAIP/DOQQ');

var naip1 = NAIP.filterDate('2005', '2007')
  .filter(ee.Filter.listContains('system:band_names', 'B'));

var naip2 = NAIP.filterDate('2017', '2018')
  .filter(ee.Filter.listContains('system:band_names', 'B'));

  var filter_may_2016 = ee.Filter.date('2016-05-22', '2016-05-24');
  var filterL8 = ee.Filter.or(filter_may_2016);

  var filter_may_1984 = ee.Filter.date('1984-05-14', '1984-05-16');
  var filterL5 = ee.Filter.or(filter_may_1984);

  var blueL8 = 'B2';
  var greenL8 = 'B3';
  var redL8 = 'B4';

  var blueL5 = 'B1';
  var greenL5 = 'B2';
  var redL5 = 'B3';

  // image collections clips to study area,
  // removes clouds and cloud shadows.
  var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filter(filterL8)

  var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filter(filterL5)

  var geeImageL8 = ee.Image(l8.mean());
  var geeImageL5 = ee.Image(l5.mean());

  var RGBImageL8 = geeImageL8.select(redL8, greenL8, blueL8);
  var RGBImageL5 = geeImageL5.select(redL5, greenL5, blueL5);

print('l8 projection', RGBImageL8.projection())
print('l5 projection', RGBImageL5.projection())

// get a GEE 2016 ee.ImageCollection for 2016
var nlcd1 = dataset.filter(ee.Filter.eq('system:index', 'NLCD2016'));
var nlcd2 = dataset.filter(ee.Filter.eq('system:index', 'NLCD2001'));

// Select the ee.ImageCollection to a gee object type ee.Image. I am not 100% sure I understand why or
// how the data is organized but the first "band" is landcover this is the only way I could get an object == ee.Image
//To do .gt, .gte, etc in this case we are using .eq with the logical .or operator the varriable must be of type ee.Image
var nlcd1_landcover_img =  ee.Image(nlcd1.select(0).first())
var nlcd2_landcover_img =  ee.Image(nlcd2.select(0).first())

// get date for later use
var todaysDate = new Date();
var yyyy = todaysDate.getFullYear().toString();
var mm = (todaysDate.getMonth()+1).toString();
var dd = todaysDate.getDate().toString();
var hr = todaysDate.getHours().toString();
var minu = todaysDate.getMinutes().toString();
var mmChars = mm.split('');
var ddChars = dd.split('');
var ddHours = hr.split('');
var ddMinutes = minu.split('')

var rundate = '_' + yyyy + '_' + (mmChars[1]?mm:"0"+mmChars[0]) + '_' +
  (ddChars[1]?dd:"0"+ddChars[0]) + '_' + (ddHours[1]?hr:"0"+ddHours[0]) + '_' +
  (ddMinutes[1]?minu:"0"+ddMinutes[0]);


var landcover = dataset.select('landcover');

print('avl bounds', tableAVL.geometry().bounds());
print('avl bounds buff',tableAVL.geometry().buffer(5000).bounds());

print('hstn bounds', tableHSTN.geometry().bounds());
print('hstn bounds buff', tableHSTN.geometry().buffer(5000).bounds());

print('lv bounds', tableLV.geometry().bounds());
print('lv bounds buff', tableLV.geometry().buffer(5000).bounds());

// get bounds of study area
var clipGeometryAVL = tableAVL.geometry().bounds();
var clipGeometryHSTN = tableHSTN.geometry().bounds();
var clipGeometryLV = tableLV.geometry().bounds();

var scale = 120;
var maxPixels = 1e9;

nlcd1_landcover_img = nlcd1_landcover_img.resample('bicubic').reproject(nlcd1_landcover_img.projection(), null, scale);
nlcd2_landcover_img = nlcd2_landcover_img.resample('bicubic').reproject(nlcd2_landcover_img.projection(), null, scale);

Map.addLayer(nlcd1_landcover_img, landcoverVis, 'Landcover 2016');
Map.addLayer(nlcd2_landcover_img, landcoverVis, 'Landcover 2001');
Map.addLayer(naip1, {bands: 'R,G,B'}, 'NAIP 2005');
Map.addLayer(naip2, {bands: 'R,G,B'}, 'NAIP 2017');
Map.addLayer(RGBImageL5, {}, 'RGB 1984');
Map.addLayer(RGBImageL8, {}, 'RGB 2016');

Map.addLayer(tableLV, {}, 'clipGeometryHSTN grid');

// var scale = 30;
// var maxPixels = 1e9;

// var naip1ID = ee.data.newTaskId();
// var naip1 = {
//     crs: 'EPSG:4326',
//     element: RGBImageL5,
//     type: 'EXPORT_IMAGE',
//     fileFormat: 'GEO_TIFF',
//     description: 'L5_LV_scale_'+scale+rundate,
//     region: clipGeometryLV,
//     driveFileNamePrefix: 'L5_LV_scale_'+scale+rundate,
//     driveFolder: 'gee-temp',
//     maxPixels: maxPixels,
//     scale: scale,
// };

// var msg = ee.data.startProcessing(naip1ID, naip1);

// var naip2ID = ee.data.newTaskId();
// var naip2 = {
//     crs: 'EPSG:4326',
//     element: RGBImageL8,
//     type: 'EXPORT_IMAGE',
//     fileFormat: 'GEO_TIFF',
//     description: 'L8_lv_scale_'+scale+rundate,
//     region: clipGeometryLV,
//     driveFileNamePrefix: 'L8_lv_scale_'+scale+rundate,
//     driveFolder: 'gee-temp',
//     maxPixels: maxPixels,
//     scale: scale,
// };
// var msg = ee.data.startProcessing(naip2ID, naip2);

// var scale = 60;
// var maxPixels = 1e9;

// var tidnlcd1_AVL = ee.data.newTaskId();
// var nlcd1_landcover_task_AVL = {
//       crs: 'EPSG:4326',
//       element: nlcd1_landcover_img,
//       type: 'EXPORT_IMAGE',
//       fileFormat: 'GEO_TIFF',
//       description: 'Landcover_2016_AVL'+scale+rundate,
//       region: clipGeometryAVL,
//       driveFileNamePrefix: 'Landcover_2016_AVL_scale_'+scale+rundate,
//       driveFolder: 'gee-temp',
//       maxPixels: maxPixels,
//       scale: scale,
// };
// var msg = ee.data.startProcessing(tidnlcd1_AVL, nlcd1_landcover_task_AVL);

// var tidnlcd2_AVL = ee.data.newTaskId();
// var nlcd2_landcover_task_AVL = {
//     crs: 'EPSG:4326',
//     element: nlcd2_landcover_img,
//     type: 'EXPORT_IMAGE',
//     fileFormat: 'GEO_TIFF',
//     description: 'Landcover_2001_AVL_scale_'+scale+rundate,
//     region: clipGeometryAVL,
//     driveFileNamePrefix: 'Landcover_2001_AVL_scale_'+scale+rundate,
//     driveFolder: 'gee-temp',
//     maxPixels: maxPixels,
//     scale: scale,
// };

// var msg = ee.data.startProcessing(tidnlcd2_AVL, nlcd2_landcover_task_AVL);

var scale = 120;
var maxPixels = 1e9;

var tidnlcd1_HST = ee.data.newTaskId();
var nlcd1_landcover_task_HSTN = {
      crs: 'EPSG:4326',
      element: nlcd1_landcover_img,
      type: 'EXPORT_IMAGE',
      fileFormat: 'GEO_TIFF',
      description: 'Landcover_2016_HSTN_scale_'+scale+rundate,
      region: clipGeometryHSTN,
      driveFileNamePrefix: 'Landcover_2016_HSTN_scale_'+scale+rundate,
      driveFolder: 'gee-temp',
      maxPixels: maxPixels,
      scale: scale,
};
var msg = ee.data.startProcessing(tidnlcd1_HST, nlcd1_landcover_task_HSTN);

var tidnlcd2_HST = ee.data.newTaskId();
var nlcd2_landcover_task_HSTN = {
    crs: 'EPSG:4326',
    element: nlcd2_landcover_img,
    type: 'EXPORT_IMAGE',
    fileFormat: 'GEO_TIFF',
    description: 'Landcover_2001_HSTN_scale_'+scale+rundate,
    region: clipGeometryHSTN,
    driveFileNamePrefix: 'Landcover_2001_HSTN_scale_'+scale+rundate,
    driveFolder: 'gee-temp',
    maxPixels: maxPixels,
    scale: scale,
};

var msg = ee.data.startProcessing(tidnlcd2_HST, nlcd2_landcover_task_HSTN);

// var scale = 5;
// var maxPixels = 1e9;

// var naip1ID = ee.data.newTaskId();
// var naip1 = {
//     crs: 'EPSG:26917',
//     element: naip1.select('R', 'G', 'B').mean(),
//     type: 'EXPORT_IMAGE',
//     fileFormat: 'GEO_TIFF',
//     description: 'naip1_LV_scale_'+scale+rundate,
//     region: clipGeometryLV,
//     driveFileNamePrefix: 'naip1_LV_scale_'+scale+rundate,
//     driveFolder: 'gee-temp',
//     maxPixels: maxPixels,
//     scale: scale,
// };

// var msg = ee.data.startProcessing(naip1ID, naip1);

// var naip2ID = ee.data.newTaskId();
// var naip2 = {
//     crs: 'EPSG:26917',
//     element: naip2.select('R', 'G', 'B').mean(),
//     type: 'EXPORT_IMAGE',
//     fileFormat: 'GEO_TIFF',
//     description: 'naip2_lv_scale_'+scale+rundate,
//     region: clipGeometryLV,
//     driveFileNamePrefix: 'naip2_lv_scale_'+scale+rundate,
//     driveFolder: 'gee-temp',
//     maxPixels: maxPixels,
//     scale: scale,
// };

// var msg = ee.data.startProcessing(naip2ID, naip2);

var landcoverVisU = {
  min: 0.0,
  max: 95.0,
  palette: [
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '466b9f',
    'd1def8',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'eb0000',
    'eb0000',
    'eb0000',
    'eb0000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b3ac9f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '68ab5f',
    '68ab5f',
    '68ab5f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'af963c',
    'af963c',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dfdfc2',
    'dfdfc2',
    'dfdfc2',
    'dfdfc2',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dcd939',
    'dcd939',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b8d9eb',
    '000000',
    '000000',
    '000000',
    '000000',
    '6c9fb8'
  ],
};
var landcoverVis = {
  min: 0.0,
  max: 95.0,
  palette: [
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '466b9f',
    'd1def8',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dec5c5',
    'd99282',
    'eb0000',
    'ab0000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b3ac9f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '68ab5f',
    '1c5f2c',
    'b5c58f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'af963c',
    'ccb879',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dfdfc2',
    'd1d182',
    'a3cc51',
    '82ba9e',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dcd939',
    'ab6c28',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b8d9eb',
    '000000',
    '000000',
    '000000',
    '000000',
    '6c9fb8'
  ],
};
