import React, { useRef, useEffect, useMemo } from "react";
import mapData from "../assets/mapData";
import { doContains } from "../utils/doContains";
import districtsByProvince from "../assets/pronvinces";

import "./nepalmap.css";

function NepalMap({
  height = "500px",
  width = "500px",
  fill = "white",
  stroke = "black",
  hoverColor,
  focusDistrict,
  focusProvince,
}) {
  let mapRef = useRef(null);

  useEffect(() => {
    // for hover effect
    if (!hoverColor) return;
    let style = document.createElement("style");
    style.innerHTML = `
      .full-map path:hover{
        fill: ${hoverColor};
      }
    `;
    document.head.append(style);
  }, [hoverColor]);

  useEffect(() => {
    //animation
    if (!focusProvince?.animateAndZoom) return;
    let scale = 2.3;
    let translateVals = highLightedProvince?.translateVals;
    if (highLightedProvince?.provinceId === 0) {
      // provinceId 0 should mean that whole map should be shown
      scale = 1;
    }

    if (!highLightedProvince) {
      console.error(
        `Invalid ProvinceId: ${focusProvince.provinceId}. Only valid provinceId are 0-7`
      );
      scale = 1;
      translateVals = "translate(0%,0%)";
    }
    let keyFrames = [{ transform: translateVals, scale }];
    const timing = {
      duration: 500,
      fill: "forwards",
    };
    mapRef.current.animate(keyFrames, timing);
  }, [focusProvince]);

  let highLightedProvince;
  if (focusProvince) {
    // find the province from the districtByProvince array
    highLightedProvince = districtsByProvince.find((el) => {
      return el.provinceId === focusProvince.provinceId;
    });
  }

  return (
    <div className="nepalmap-container-77">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        viewBox="0 0 1086.36 543.89"
        xmlSpace="preserve"
        height={height}
        width={width}
        style={{ fill, stroke }}
      >
        <g className="full-map" id="Nepal" ref={mapRef}>
          <Districts
            focusProvince={focusProvince}
            highLightedProvince={highLightedProvince}
            focusDistrict={focusDistrict}
          />
        </g>
      </svg>
    </div>
  );
}

export default NepalMap;

function Districts({ focusProvince, focusDistrict, highLightedProvince }) {
  let pathRef = useRef([]);
  useEffect(() => {
    pathRef.current.forEach((el) => {
      if (!el) return;
      let fill = "";
      let district = el.getAttribute("id");
      if (doContains(highLightedProvince?.districtList, district)) {
        fill = focusProvince?.fill;
      }
      if (doContains(focusDistrict?.districtList, district)) {
        fill = focusDistrict?.fill;
      }
      el.style.fill = fill;
    });
  }, [focusProvince, focusDistrict]);

  // create the 77 districts
  let district = useMemo(
    () =>
      mapData.map((el, i) => {
        return (
          <path
            ref={(e) => pathRef.current.push(e)}
            d={el.path}
            id={el.district}
            key={el.district + i}
          />
        );
      }),
    []
  );
  return district;
}
