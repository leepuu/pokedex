import { ChangeEvent } from "react";
import s from "./Search.module.scss";
interface SerachProps {
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickFind: () => void;
}
import { ReactComponent as SearchIcon } from "assets/icons/icon_search.svg";
export default function Search(props: SerachProps) {
  const { handleChangeInput, handleClickFind } = props;

  return (
    <div className={s.box_input}>
      <div className={s.inner}>
        <label className="blind" htmlFor="pokemonSearch">
          포켓몬 검색
        </label>
        <input
          type="search"
          id="pokemonSearch"
          onChange={handleChangeInput}
          className={s.input}
          placeholder="Search Number or Name"
        />
        <button type="button" onClick={handleClickFind} className={s.btn_search}>
          <SearchIcon />
          <span className="blind">검색</span>
        </button>
      </div>
    </div>
  );
}
