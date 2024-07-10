import React from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { IMSMResultIM, IMSMThemeIM } from "./im-side";

const IMSMListIM = () => {
  const { smThemes } = useSelector((state: RootState) => state.searchMapper);
  return (
    <div className="d-grid gap-3">
      {smThemes.length > 1 &&
        smThemes
          .slice(1)
          .map((theme) => (
            <IMSMThemeIM key={theme.id} theme={theme} toggled={false} />
          ))}
      {smThemes[0].searchResultList.map((result) => (
        <IMSMResultIM key={result.id} result={result} />
      ))}
    </div>
  );
};

export default IMSMListIM;
