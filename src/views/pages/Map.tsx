import React, { useEffect } from "react";
import styles from "./Map.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IMButtonLeftIcon } from "../../components/common/button";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import IMSMListIM from "../../components/search-mapper/IMSMListIM";
import IMMapCanvas from "../../components/idea-mapper/IMMapCanvas";
import { useDispatch } from "react-redux";
import { ideaMapperActions } from "../../store/reducers/idea-mapper";

export const MapPage = () => {
  const { searchMapperWidth } = useSelector((state: RootState) => state.global);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ideaMapperActions.loadWholePage());
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.saved} style={{ width: searchMapperWidth }}>
        <div className="mb-3">
          <IMButtonLeftIcon
            bsIcon="chevron-left"
            bsVariant="primary"
            onClick={() => navigate(-1)}
          >
            {config.IDEA_SAVER_NAME}
          </IMButtonLeftIcon>
        </div>
        <IMSMListIM />
      </div>
      <div
        className={styles.canvas}
        style={{ width: `calc(100vw - 1.5rem - ${searchMapperWidth}px)` }}
      >
        <IMMapCanvas />
      </div>
    </div>
  );
};
