<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis styleCategories="AllStyleCategories" hasScaleBasedVisibilityFlag="0" version="3.4.3-Madeira" minScale="1e+08" maxScale="0">
  <flags>
    <Identifiable>1</Identifiable>
    <Removable>1</Removable>
    <Searchable>1</Searchable>
  </flags>
  <customproperties>
    <property key="WMSBackgroundLayer" value="false"/>
    <property key="WMSPublishDataSourceUrl" value="false"/>
    <property key="embeddedWidgets/count" value="0"/>
    <property key="identify/format" value="Value"/>
  </customproperties>
  <pipe>
    <rasterrenderer band="1" alphaBand="-1" classificationMax="247" opacity="1" classificationMin="0" type="singlebandpseudocolor">
      <rasterTransparency/>
      <minMaxOrigin>
        <limits>None</limits>
        <extent>WholeRaster</extent>
        <statAccuracy>Estimated</statAccuracy>
        <cumulativeCutLower>0.02</cumulativeCutLower>
        <cumulativeCutUpper>0.98</cumulativeCutUpper>
        <stdDevFactor>2</stdDevFactor>
      </minMaxOrigin>
      <rastershader>
        <colorrampshader clip="0" colorRampType="INTERPOLATED" classificationMode="3">
          <colorramp name="[source]" type="gradient">
            <prop k="color1" v="255,245,240,255"/>
            <prop k="color2" v="103,0,13,255"/>
            <prop k="discrete" v="0"/>
            <prop k="rampType" v="gradient"/>
            <prop k="stops" v="0.13;254,224,210,255:0.26;252,187,161,255:0.39;252,146,114,255:0.52;251,106,74,255:0.65;239,59,44,255:0.78;203,24,29,255:0.9;165,15,21,255"/>
          </colorramp>
          <item alpha="255" value="0" color="#00003c" label="0"/>
          <item alpha="255" value="7" color="#000059" label="7"/>
          <item alpha="255" value="27" color="#000080" label="27"/>
          <item alpha="255" value="47" color="#0000e8" label="47"/>
          <item alpha="255" value="67" color="#0080ff" label="67"/>
          <item alpha="255" value="87" color="#00c080" label="87"/>
          <item alpha="255" value="107" color="#01ff00" label="107"/>
          <item alpha="255" value="127" color="#c0ff00" label="127"/>
          <item alpha="255" value="147" color="#ffff00" label="147"/>
          <item alpha="255" value="167" color="#ffc100" label="167"/>
          <item alpha="255" value="187" color="#ff8000" label="187"/>
          <item alpha="255" value="207" color="#ff0000" label="207"/>
          <item alpha="255" value="227" color="#a30000" label="227"/>
          <item alpha="255" value="247" color="#590000" label="247"/>
        </colorrampshader>
      </rastershader>
    </rasterrenderer>
    <brightnesscontrast brightness="0" contrast="0"/>
    <huesaturation colorizeStrength="100" colorizeRed="255" grayscaleMode="0" colorizeOn="0" saturation="0" colorizeGreen="128" colorizeBlue="128"/>
    <rasterresampler maxOversampling="2"/>
  </pipe>
  <blendMode>0</blendMode>
</qgis>
