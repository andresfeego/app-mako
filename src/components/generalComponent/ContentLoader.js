import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import colors from "../../res/colors"



export const LoaderUno = (props) => (
  <ContentLoader 
    speed={1}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor={colors.gray2}
    foregroundColor="#000"
    {...props}
  >
    <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
    <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
    <Rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
    <Rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
    <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
    <Circle cx="20" cy="20" r="20" />
  </ContentLoader>
)


export const DirectorioWebLoader = (props) => (
    <ContentLoader
    speed={1}
    width={400}
    height={750}
    viewBox="0 0 265 500"
    backgroundColor={colors.gray7}
    foregroundColor={colors.gray8}
    {...props}
     >
      <Rect x="2" y="10" rx="4" ry="4" width="260" height="25" />
      <Rect x="2" y="60" rx="2" ry="2" width="260" height="100" />
      <Rect x="2" y="180" rx="2" ry="2" width="260" height="100" />
      <Rect x="2" y="300" rx="2" ry="2" width="260" height="100" />
    </ContentLoader>
  )

  export const GeneralMenuLoader = (props) => (
    <ContentLoader
    speed={1}
    width={800}
    height={50}
viewBox="0 0 9192.44 1205.56"
    backgroundColor={colors.gray7}
    foregroundColor={colors.gray8}
    style={{ bottom: 0, alignItems: 'center', width: '50%', backgroundColor: '#000' }}
    {...props}
     >
      <Circle class="fil0" cx="602.78" cy="602.78" r="602.78"/>
  <Circle class="fil0" cx="2599.5" cy="602.78" r="602.78"/>
  <Circle class="fil0" cx="4596.22" cy="602.78" r="602.78"/>
  <Circle class="fil0" cx="6592.94" cy="602.78" r="602.78"/>
  <Circle class="fil0" cx="8589.66" cy="602.78" r="602.78"/>
    </ContentLoader>
  )

  