import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { searchMapperActions } from "../../store/reducers/search-mapper";
import { IMSMPlaceholder } from "./serp-side/IMSMPlaceholder";
import { IMSMThemeSERP } from "./serp-side/IMSMThemeSERP";
import IMSMResultSERP from "./serp-side/IMSMResultSERP";
import { IMSMTextDialog, IMSMThemeDialog } from "./dialog";

const MESSAGE = {
  MOVE_LAST_RESULT:
    "This is the last saved result in this IdeaTag, moving this result from the IdeaTag will also delete this IdeaTag and its IdeaNote.",
};

const IMSMListSERP = () => {
  const {
    submitting,
    smThemes,
    themeDialogShow,
    themeDialogMode,
    textDialogShow,
    textDialogMode,
    currentFocusResult,
    currentFocusTheme,
  } = useSelector((state: RootState) => state.searchMapper);

  const dispatch = useDispatch();

  const handleDeleteResult = useCallback(
    (resultID: number, fromThemeID?: number) => {
      console.log(`Delete result ${resultID}`);

      const isThemed = fromThemeID != undefined;
      const isLastResult =
        isThemed &&
        smThemes.find((el) => el.id == fromThemeID)?.searchResultList.length ==
          1;
      const isConfirmed = isLastResult
        ? window.confirm(MESSAGE.MOVE_LAST_RESULT)
        : true;

      if (!isConfirmed) return;

      dispatch(searchMapperActions.deleteResults(resultID));

      if (!isLastResult) return;

      dispatch(searchMapperActions.deleteTheme(fromThemeID));
    },
    []
  );

  const handleThemeDialogSubmission = useCallback(
    (
      fromThemeID: number,
      toThemeID: number,
      resultID: number,
      themeName: string
    ) => {
      const isThemed = fromThemeID != -999;
      const isLastResult =
        isThemed &&
        smThemes.find((el) => el.id == fromThemeID)?.searchResultList.length ==
          1;
      const isConfirmed = isLastResult
        ? window.confirm(MESSAGE.MOVE_LAST_RESULT)
        : true;

      if (isConfirmed) {
        console.log(
          `Add result ${resultID} from ${fromThemeID} to ${toThemeID}, with theme name: ${themeName}`
        );

        if (toThemeID == -1) {
          // Create new theme
          dispatch(
            searchMapperActions.createTheme({
              firstResultID: resultID,
              themeName,
            })
          );
        } else {
          // Change theme
          dispatch(searchMapperActions.changeTheme({ resultID, toThemeID }));
        }

        if (isLastResult) {
          // Delete theme
          dispatch(searchMapperActions.deleteTheme(fromThemeID));
        }
      }
    },
    []
  );

  const handleAddToTheme = useCallback((resultID: number) => {
    dispatch(searchMapperActions.openAddToThemeDialog(resultID));
  }, []);

  const handleMoveToTheme = useCallback(
    (resultID: number, fromThemeID: number) => {
      dispatch(
        searchMapperActions.openMoveToThemeDialog({
          resultID,
          themeID: fromThemeID,
        })
      );
    },
    []
  );

  const handleRemoveFromTheme = useCallback(
    (resultID: number) => {
      console.log(`Ungroup result ${resultID}`);
      dispatch(
        searchMapperActions.changeTheme({ resultID, toThemeID: smThemes[0].id })
      );
    },
    [smThemes]
  );

  const handleEditThemeNote = useCallback(
    (themeID: number, noteID: number, content: string) => {
      console.log(`Edit idea ${noteID} in theme ${themeID} to ${content}`);
      dispatch(searchMapperActions.editThemeNote({ themeID, noteID, content }));
    },
    []
  );

  const handleRenameTheme = useCallback((themeID: number, name: string) => {
    console.log(`Rename theme ${themeID} to ${name}`);
    dispatch(searchMapperActions.renameTheme({ themeID, name }));
  }, []);

  useEffect(() => {
    dispatch(searchMapperActions.loadResults());
  }, []);

  return (
    <div className="d-grid gap-3">
      {smThemes.length == 1 && smThemes[0].searchResultList.length == 0 && (
        <IMSMPlaceholder />
      )}
      {smThemes.length > 1 &&
        smThemes
          .slice(1)
          .map((theme) => (
            <IMSMThemeSERP
              key={theme.id}
              theme={theme}
              onRenameTheme={() =>
                dispatch(searchMapperActions.openRenameThemeDialog(theme.id))
              }
              onEditThemeIdea={() =>
                dispatch(searchMapperActions.openEditIdeaDialog(theme.id))
              }
              onDeleteResult={handleDeleteResult}
              onMoveToTheme={handleMoveToTheme}
              onRemoveFromTheme={handleRemoveFromTheme}
            />
          ))}
      {smThemes[0].searchResultList.map((result) => (
        <IMSMResultSERP
          key={result.id}
          result={result}
          onDeleteResult={handleDeleteResult}
          onAddToTheme={handleAddToTheme}
        />
      ))}
      <IMSMThemeDialog
        show={themeDialogShow}
        mode={themeDialogMode}
        submitting={submitting}
        themes={smThemes}
        currentFocusTheme={currentFocusTheme}
        currentFocusResult={currentFocusResult}
        onSubmission={handleThemeDialogSubmission}
        onClose={() => {
          dispatch(searchMapperActions.closeThemeDialog());
        }}
      />
      <IMSMTextDialog
        show={textDialogShow}
        mode={textDialogMode}
        submitting={submitting}
        themes={smThemes}
        currentFocusTheme={currentFocusTheme}
        onRenameTheme={handleRenameTheme}
        onEditIdea={handleEditThemeNote}
        onClose={() => dispatch(searchMapperActions.closeTextDialog())}
      />
    </div>
  );
};

export default IMSMListSERP;
