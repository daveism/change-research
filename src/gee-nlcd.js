var dataset = ee.ImageCollection('USGS/NLCD');

// get a GEE 2016 ee.ImageCollection for 2016
var nlcd_2016 = dataset.filter(ee.Filter.eq('system:index', 'NLCD2016'));
var nlcd_2001 = dataset.filter(ee.Filter.eq('system:index', 'NLCD2001'));

// Select the ee.ImageCollection to a gee object type ee.Image. I am not 100% sure I understand why or
// how the data is organized but the first "band" is landcover this is the only way I could get an object == ee.Image
//To do .gt, .gte, etc in this case we are using .eq with the logical .or operator the varriable must be of type ee.Image
var nlcd_2016_landcover_img =  ee.Image(nlcd_2016.select(0).first())
var nlcd_2001_landcover_img =  ee.Image(nlcd_2001.select(0).first())

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


// Map.setCenter(-95, 38, 5);

// get bounds of study area
var clipGeometry = table.geometry().bounds();
var scale = 120;
var maxPixels = 1e9;

nlcd_2016_landcover_img = nlcd_2016_landcover_img.resample('bicubic').reproject(nlcd_2016_landcover_img.projection(), null, scale);
nlcd_2001_landcover_img = nlcd_2001_landcover_img.resample('bicubic').reproject(nlcd_2001_landcover_img.projection(), null, scale);

Map.addLayer(nlcd_2016_landcover_img, landcoverVis, 'Landcover 2016');
Map.addLayer(nlcd_2001_landcover_img, landcoverVis, 'Landcover 2001');
Map.addLayer(table, {}, 'grid');

var tid2016 = ee.data.newTaskId();
var nlcd_2016_landcover_task = {
      crs: 'EPSG:4326',
      element: nlcd_2016_landcover_img,
      type: 'EXPORT_IMAGE',
      fileFormat: 'GEO_TIFF',
      description: 'Landcover_2016'+rundate,
      region: clipGeometry,
      driveFileNamePrefix: 'Landcover_2016_scale_'+scale+rundate,
      driveFolder: 'gee-temp',
      maxPixels: maxPixels,
      scale: scale,
};
var msg = ee.data.startProcessing(tid2016, nlcd_2016_landcover_task);

var tid2001 = ee.data.newTaskId();
var nlcd_2001_landcover_task = {
    crs: 'EPSG:4326',
    element: nlcd_2001_landcover_img,
    type: 'EXPORT_IMAGE',
    fileFormat: 'GEO_TIFF',
    description: 'Landcover_2001'+rundate,
    region: clipGeometry,
    driveFileNamePrefix: 'Landcover_2001_scale_'+scale+rundate,
    driveFolder: 'gee-temp',
    maxPixels: maxPixels,
    scale: scale,
};

var msg = ee.data.startProcessing(tid2001, nlcd_2001_landcover_task);
