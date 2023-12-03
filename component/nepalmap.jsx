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
  focusedDistrict,
  focusedProvince,
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
    if (!focusedProvince?.animateAndZoom) return;
    let scale = 2.5;
    let translateVals = highLightedProvince?.translateVals;
    if (highLightedProvince?.provinceId === 0) {
      // provinceId 0 should mean that whole map should be shown
      scale = 1;
    }
    if (!highLightedProvince) {
      console.error(`Only valid provinceId are 0-7`);
      scale = 1;
      translateVals = "translate(0%,0%)";
    }
    let keyFrames = [{ transform: translateVals, scale }];
    const timing = {
      duration: 500,
      fill: "forwards",
    };
    mapRef.current.animate(keyFrames, timing);
  }, [focusedProvince]);

  let highLightedProvince;
  if (focusedProvince) {
    // find the province from the districtByProvince array
    highLightedProvince = districtsByProvince.find((el) => {
      return el.provinceId === focusedProvince.provinceId;
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
          {/* {districts} */}
          <Districts
            focusedProvince={focusedProvince}
            highLightedProvince={highLightedProvince}
            focusedDistrict={focusedDistrict}
          />
        </g>
      </svg>
    </div>
  );
}

export default NepalMap;

function Districts({ focusedProvince, focusedDistrict, highLightedProvince }) {
  // create the 77 districts

  let district = useMemo(
    () =>
      mapData.map((el, i) => {
        // checks if focusedDistrict.districtList contains the district currently in the interation
        if (
          doContains(focusedDistrict?.districtList, el.district) ||
          doContains(highLightedProvince?.districtList, el.district)
        ) {
          let fill;
          if (doContains(focusedDistrict?.districtList, el.district)) {
            fill = focusedDistrict?.fill;
          } else {
            fill = focusedProvince?.fill;
          }
          return (
            <path
              d={el.path}
              id={el.district}
              key={el.district}
              style={{ fill }}
            />
          );
        }
        return <path d={el.path} id={el.district} key={el.district} />;
      }),
    [(focusedProvince, focusedDistrict, highLightedProvince)]
  );
  return district;
}
