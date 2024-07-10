import React, { useCallback } from "react";
import styles from "./IMSMTheme.IM.module.scss";
import { SearchMapperTheme } from "../../../model/search-mapper";
import { OverlayTrigger } from "react-bootstrap";
import { TooltipHOC } from "../../common/popup";
import { IMButtonIconRounded } from "../../common/button";
import { IMSMResultIM } from "./IMSMResultIM";

type SMThemeProps = {
  theme: SearchMapperTheme;
  toggled: boolean;
};

export const IMSMThemeIM = (props: SMThemeProps) => {
  const { theme, toggled } = props;

  const handleAddTheme = useCallback(() => {
    console.log("TODO: Add a theme to IdeaMapper");
  }, []);

  const handleToggleTheme = useCallback(() => {
    console.log("TODO: Toggle a theme in IdeaMapper");
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles["theme-title"]}>{theme.name}</div>
      <div className={styles.results}>
        {theme.searchResultList.map((r) => (
          <IMSMResultIM key={r.id} result={r} />
        ))}
      </div>
      <hr />
      <div
        className={`${styles.note}${
          theme.note === "" ? ` ${styles.emptyNote} noselect` : ""
        }`}
      >
        {theme.note !== ""
          ? `${theme.note}`
          : "There is no IdeaNote in this IdeaTag"}
      </div>
      <div className={styles.actions}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 0 }}
          overlay={TooltipHOC(
            toggled ? "Edit IdeaTag in IdeaMapper" : "Add IdeaTag to IdeaMapper"
          )}
        >
          <div className="d-inline-block">
            <IMButtonIconRounded
              bsVariant={toggled ? "light" : "primary"}
              bsIcon={toggled ? "pencil-square" : "plus-lg"}
              onClick={toggled ? handleToggleTheme : handleAddTheme}
            />
          </div>
        </OverlayTrigger>
      </div>
    </div>
  );
};
