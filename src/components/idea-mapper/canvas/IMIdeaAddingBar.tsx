import React from "react";
import styles from "./IMIdeaAddingBar.module.scss";

type IdeaAddingBarProps = {
  onTextIdea: () => void;
  onLinkIdea: () => void;
  onImageIdea: () => void;
};

type IdeaAddingTypeProps = {
  bsIcon: string;
  onClick: () => void;
  children?: React.ReactNode;
};

const IMIdeaAddingBar = (props: IdeaAddingBarProps) => {
  return (
    <div className={`noselect ${styles.bar_wrap}`}>
      <p className="font-weight-bold">Add Custom Ideas</p>
      <IMIdeaAddingType bsIcon="type" onClick={props.onTextIdea}>
        Text
      </IMIdeaAddingType>
      <IMIdeaAddingType bsIcon="link-45deg" onClick={props.onLinkIdea}>
        Link
      </IMIdeaAddingType>
      <IMIdeaAddingType bsIcon="image" onClick={props.onImageIdea}>
        Image
      </IMIdeaAddingType>
    </div>
  );
};

const IMIdeaAddingType = (props: IdeaAddingTypeProps) => {
  return (
    <button type="button" className={styles.type_wrap} onClick={props.onClick}>
      <h2>
        <i className={`bi bi-${props.bsIcon}`}></i>
      </h2>
      <h3>{props.children}</h3>
    </button>
  );
};

export default IMIdeaAddingBar;
