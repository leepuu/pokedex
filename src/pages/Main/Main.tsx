import React, { ChangeEvent, useState } from "react";
import Card from "components/Card";
import s from "assets/styles/pages/Main.module.scss";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import axios from "utils/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "components/Loading";
import Search from "components/Search";
import { Name } from "components/Search/name";

interface Pokemon {
  name?: string;
  url?: string;
}

export default function Main() {
  const [value, setValue] = useState<number | string>();
  const [Item, setItem] = useState<number | string>();
  const [isList, setIsList] = useState(true);
  const fetchRepositories = async (page: number) => {
    const res = await axios.get(`/pokemon/?limit=10&offset=${page}`);
    if (res.status < 200 && res.status >= 300) {
      throw new Error("Pokemon Not Found");
    }
    return res.data;
  };

  const {
    data: Pokemon,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["pokemon"],
    async ({ pageParam = 0 }) => {
      return await fetchRepositories(pageParam);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length * 10;
        console.log(nextPage);
        return nextPage;
      },
    }
  );

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && hasNextPage) {
      observer.unobserve(entry.target);
      await fetchNextPage();
      observer.observe(entry.target);
    }
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    threshold: 0.5,
    onIntersect,
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickFind = () => {
    if (value) {
      if (isNaN(Number(value))) {
        const koname = Object.entries(Name).some(([number, name]) => {
          if (name === value) {
            setItem(Number(number));
            return true;
          } else {
            return false;
          }
        });
        if (!koname) {
          alert("해당하는 포켓몬이 없습니다.");
        }
      } else {
        setItem(value);
        if (value > 905) {
          alert("해당하는 포켓몬이 없습니다.");
        }
      }
    } else {
      alert("검색어를 입력해주세요.");
    }
    setIsList(false);
  };

  return (
    <div className={s.wrap}>
      <Search handleChangeInput={handleChangeInput} handleClickFind={handleClickFind} />
      {Item && (
        <div className={s.list}>
          <Card name={Item} />
        </div>
      )}
      {isList && Pokemon && (
        <>
          <div className={s.list}>
            {Pokemon.pages.map((item, index) => (
              <React.Fragment key={index}>
                {item.results.map((item: Pokemon, index: number) => (
                  <Card key={index} name={item.name} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className={s.loading} ref={setTarget}>
            {isFetching && <Loading />}
          </div>
        </>
      )}
    </div>
  );
}
