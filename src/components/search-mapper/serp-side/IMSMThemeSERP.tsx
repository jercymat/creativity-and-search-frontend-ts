import React from "react";
import styles from "./IMSMTheme.SERP.module.scss";
import { SearchMapperTheme } from "../../../model/search-mapper";
import IMSMResultGroupedSERP from "./IMSMResultGroupedSERP";

interface SMThemeProps {
  theme: SearchMapperTheme;
  onRenameTheme: () => void;
  onEditThemeIdea: () => void;
  onRemoveFromTheme: (resultID: number) => void;
  onMoveToTheme: (resultID: number, fromThemeID: number) => void;
  onDeleteResult: (resultID: number, fromThemeID: number) => void;
}

export const IMSMThemeSERP = (props: SMThemeProps) => {
  const {
    theme,
    onRenameTheme,
    onEditThemeIdea,
    onRemoveFromTheme,
    onMoveToTheme,
    onDeleteResult,
  } = props;

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles["theme-title"]}
        onClick={onRenameTheme}
      >
        {theme.name}
      </button>
      <div className={styles.results}>
        {theme.searchResultList.map((r) => (
          <IMSMResultGroupedSERP
            key={r.id}
            result={r}
            onDeleteResult={(resultID) => onDeleteResult(resultID, theme.id)}
            onRemoveFromTheme={onRemoveFromTheme}
            onMoveToTheme={(resultID) => onMoveToTheme(resultID, theme.id)}
          />
        ))}
      </div>
      <hr />
      <button type="button" className={styles.note} onClick={onEditThemeIdea}>
        {theme.note != "" ? (
          <span>{theme.note}</span>
        ) : (
          <span className={styles.placeholder}>
            Any ideas from these results?
          </span>
        )}
      </button>
    </div>
  );
};
