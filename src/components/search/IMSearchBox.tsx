import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./IMSearchBox.module.scss";
import { Link } from "react-router-dom";

interface Props {
  id?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultQuery?: string;
}

export const IMSearchBox = (props: Props) => {
  const { id, placeholder, className, style, defaultQuery } = props;
  const [query, setQuery] = useState(
    defaultQuery != undefined ? defaultQuery : ""
  );
  const searchRef = useRef<HTMLAnchorElement>(null);

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key != "Enter") return;
    if (query == "") return;

    if (searchRef.current) {
      searchRef.current.click();
    }
  };

  return (
    <div id={id} className={className} style={style}>
      <div className={styles["search-form"]}>
        <input
          type="text"
          placeholder={
            placeholder == undefined ? "Default Placeholder" : placeholder
          }
          value={query}
          className={styles["search-input"]}
          onChange={(evt) => setQuery(evt.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <div className={styles["search-button"]}>
          <Link
            className={query == "" ? styles.disabled : undefined}
            to={query != "" ? `/search?q=${query.replace(" ", "+")}` : "#"}
            ref={searchRef}
          >
            <FontAwesomeIcon icon={["fas", "magnifying-glass"]} />
          </Link>
        </div>
      </div>
    </div>
  );
};
