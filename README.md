# np-react-map

embed nepalmap in react js application

```javascript
<NepalMap height="400px" width="400px" />
```

**props**

| props         | Description                | Example Value       |
| ------------- | -------------------------- | ------------------- |
| `height`      | Set height                 | "500px"             |
| `width`       | Set width                  | "500px"             |
| `hoverColor`  | Set hover color            | "red"               |
| `stroke`      | Set stroke(border)         | "blue"              |
| `fill`        | set fill (color)           | "white"             |
| focusDistrict | focus of specific district | object(given below) |
| focusProvince | focus of specific district | object(given below) |

#### focusDistrict & focusProvince object

**focusDistrict**

```javascript
focusDistrict = {
  districtList: ["kavre", "kathmandu"],
  fill: "green",
};
```

**focusProvince**

```javascript
focusProvince = {
  provinceId: provinceId,
  fill: "green",
  animateAndZoom: true,
};
```

provinceId can be set from 0-7 (0 being full map and 1-7 being corresponding province)
