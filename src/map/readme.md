# qgis make tile settings for generating xyz tiles (directory)

## IKNOW
* -82.64750495397475,-82.49816237322194,35.50789663006824,35.61210336993178 [EPSG:4326]
* 1
* 14
* 96
* PNG
* 75
* 256
* 256
* check use inverted tiles y axis
* /Users/daveism/Github/change-research/dist/maps/iknow_1
* /Users/daveism/Github/change-research/dist/maps/iknow_2

## HSTN
* -95.94039558305192,-95.79105300229912,29.67074970916258,29.77495644902612 [EPSG:4326]
* 1
* 14
* 96
* PNG
* 75
* 256
* 256
* check use inverted tiles y axis
* /Users/daveism/Github/change-research/dist/maps/landcover_1
* /Users/daveism/Github/change-research/dist/maps/landcover_2

## LV
* -114.89990079623978,-114.75055821548698,36.07957384883393,36.18378058869747 [EPSG:4326]
* 1
* 14
* 96
* PNG
* 75
* 256
* 256
* check use inverted tiles y axis
* check use inverted tiles y axis
* /Users/daveism/Github/change-research/dist/maps/lakemead_1
* /Users/daveism/Github/change-research/dist/maps/lakemead_2

### may need to to do some gdal for LV l8 image to mask it
gdalwarp -s_srs EPSG:4326 -t_srs EPSG:4326 -of GTiff -cutline /var/folders/l2/wlv_nyls1_b6qgtjxlfmgn2r0000gn/T/processing_974251da339c4455bb95118ff909a92e/c6bf7ddf17c24abe8f4bc745aabc6ec1/MASK.shp -crop_to_cutline -dstnodata 0.0 /Users/daveism/Github/change-research/src/map/geeimages/L8_lv_scale_30_2020_01_30_20_15.tif /Users/daveism/cut-l8.tif
