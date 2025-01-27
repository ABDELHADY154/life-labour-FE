/** @format */

import React from "react";
import ContentLoader from "react-content-loader";

export const DepLoader = (props) => (
  <ContentLoader
    speed={1}
    width={150}
    height={150}
    viewBox='0 0 150 150'
    backgroundColor='#fafafa'
    foregroundColor='#e6e6e6'
    {...props}
  >
    <circle cx='109' cy='59' r='25' />
    <rect x='67' y='106' rx='0' ry='0' width='85' height='20' />
  </ContentLoader>
);

export const Loader2 = (props) => (
  <ContentLoader
    speed={1}
    width={1000}
    height={129}
    viewBox='0 0 1000 129'
    backgroundColor='#fafafa'
    foregroundColor='#e6e6e6'
    {...props}
  >
    <rect x='7' y='4' rx='2' ry='2' width='270' height='21' />
  </ContentLoader>
);

export const AvatarLoader = (props) => (
  <ContentLoader
    speed={2}
    width={40}
    height={40}
    viewBox='0 0 40 40'
    backgroundColor='#787878'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='20' cy='17' r='15' />
  </ContentLoader>
);
export const EditImgLoader = (props) => (
  <ContentLoader
    speed={2}
    width={170}
    height={170}
    viewBox='0 0 170 170'
    backgroundColor='#787878'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='86' cy='77' r='71' />
  </ContentLoader>
);

export const ProfileImgLoader = (props) => (
  <ContentLoader
    speed={2}
    width={130}
    height={130}
    viewBox='0 0 130 130'
    backgroundColor='#787878'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='61' cy='72' r='53' />
  </ContentLoader>
);
export const LogoesCarousel = (props) => (
  <ContentLoader
    speed={1}
    width={70}
    height={70}
    viewBox='0 0 50 80'
    backgroundColor='#fafafa'
    foregroundColor='#e6e6e6'
    {...props}
  >
    <circle cx='109' cy='59' r='25' />
  </ContentLoader>
);
export const FormLoader = (props) => (
  <ContentLoader width={355} height={600} viewBox='0 0 355 600' {...props}>
    <rect x='4' y='8' rx='16' ry='16' width='7' height='86' />
    <rect x='6' y='8' rx='16' ry='16' width='675' height='8' />
    <rect x='6' y='86' rx='16' ry='16' width='669' height='8' />
    <rect x='350' y='8' rx='16' ry='16' width='6' height='86' />
    <rect x='25' y='25' rx='16' ry='16' width='200' height='50' />
    <rect x='240' y='25' rx='3' ry='3' width='100' height='10' />
    <rect x='240' y='45' rx='3' ry='3' width='100' height='10' />
    <rect x='240' y='65' rx='3' ry='3' width='100' height='10' />
  </ContentLoader>
);
