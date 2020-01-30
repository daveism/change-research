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
* /Users/daveism/Github/change-research/dist/maps/naip_1
* /Users/daveism/Github/change-research/dist/maps/naip_2

### may need to to do some gdal for LV naip images
gdalwarp -s_srs EPSG:26917 -t_srs EPSG:4326 -r average -of GTiff naip1_lv_scale_5_2020_01_25_13_46.tif naip1_rp_av.tif



gdalwarp -s_srs EPSG:4326 -t_srs EPSG:4326 -of GTiff -tr 4.8010738789362284e-05 -4.801073878936242e-05 -tap -cutline square-grid-geojson-third.json -crop_to_cutline -multi naip1_rp_av.tif naip1_cut.tif

gdalwarp -s_srs EPSG:26917 -t_srs EPSG:4326 -r average -of GTiff naip2_lv_scale_5_2020_01_26_09_26.tif naip2_rp_av.tif


gdalwarp -s_srs EPSG:4326 -t_srs EPSG:4326 -of GTiff -tr 4.8010738789362284e-05 -4.801073878936242e-05 -tap -cutline square-grid-geojson-third.json -crop_to_cutline -multi naip2_rp_av.tif naip2_cut.tif
