import React, { useEffect, useState } from "react";
import styles from "./IMColorPicker.module.scss";
import { Button, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFillDrip } from "@fortawesome/free-solid-svg-icons";
import { themeColorScheme } from "../util/color-picker";
import { TooltipHOC } from "../../common/popup";

interface ThemeDialogColorPickerProps {
  defaultColor: string;
  onPickedColor: (color: string) => void;
}

export const IMThemeDialogColorPicker = (
  props: ThemeDialogColorPickerProps
) => {
  const { defaultColor, onPickedColor } = props;

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickedColor, setPickedColor] = useState("#F0F0F0");

  useEffect(() => {
    setPickedColor(defaultColor);
  }, [defaultColor]);

  useEffect(() => {
    onPickedColor(pickedColor);
  }, [pickedColor, onPickedColor]);

  const renderPicker = () => (
    <div className={`${styles.picker} p-2`}>
      <div className="d-flex">
        {Object.keys(themeColorScheme)
          .slice(0, 5)
          .map((c, idx) => (
            <div
              key={idx}
              className={`${styles.hue} rounded-circle ${
                pickedColor === c ? styles.active : ""
              }`}
              onClick={() => setPickedColor(c)}
              style={{ backgroundColor: c }}
            />
          ))}
      </div>
      <div className="d-flex mt-2">
        {Object.keys(themeColorScheme)
          .slice(5, 10)
          .map((c, idx) => (
            <div
              key={idx}
              className={`${styles.hue} rounded-circle ${
                pickedColor === c ? styles.active : ""
              }`}
              onClick={() => setPickedColor(c)}
              style={{ backgroundColor: c }}
            />
          ))}
      </div>
    </div>
  );

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={TooltipHOC("Pick Theme Color Scheme")}
      >
        <div className="d-inline-block">
          <Button
            className={`rounded-circle px-0`}
            style={{
              height: "36px",
              width: "36px",
              backgroundColor: pickedColor,
            }}
            variant="light"
            onClick={() => setPickerOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faFillDrip} />
          </Button>
        </div>
      </OverlayTrigger>
      {pickerOpen && renderPicker()}
    </>
  );
};
