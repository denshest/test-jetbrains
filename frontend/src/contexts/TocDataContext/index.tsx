import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { ITocAnchor, ITocData, ITocPage } from '@/types/toc';

type State = {
  data: ITocData | null;
  isLoading: boolean;
  getPageParentsIds: (id: string) => string[];
  getPagesBySearchText: (search: string) => Promise<ITocPage[]>;
  getPageById: (id: string) => ITocPage | undefined;
  getAnchorByHash: (hash: string) => ITocAnchor | undefined;
  getAnchorById: (id: string) => ITocAnchor | undefined;
}

const TocDataContext = createContext<State | undefined>(undefined);

const useTocData = (): State => {
  const context = useContext(TocDataContext);

  if (!context) {
    throw new Error('You need to use this context only with TocDataProvider');
  }

  return context;
};

const TocDataProvider: FC = (props) => {
  const [data, setData] = useState<ITocData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/v1/help_toc/')
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);

        return response.json();
      })
      .then((result: ITocData) => setData(result))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
    ;
  }, []);

  const getPagesBySearchText = async (search: string): Promise<ITocPage[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (data) {
          const pages = Object.values(data.entities.pages);

          resolve(pages.filter(
            item => item.title.includes(search)).map(
            item => ({ ...item, title: item.title.replaceAll(new RegExp(`(${search})`, 'gi'), '<em>$1</em>') })
          ));
        }
      }, 500);
    });
  };

  const getPageById = (id: string): ITocPage | undefined => data?.entities.pages[id];

  const getAnchorByHash = (hash: string): ITocAnchor | undefined => data ? Object.values(data?.entities.anchors).find(anchor => anchor.anchor === hash) : undefined;

  const getAnchorById = (id: string): ITocAnchor | undefined => data ? data?.entities.anchors[id] : undefined;

  const getPageParentsIds = (id: string): string[] => {
    let page: ITocPage | undefined = data?.entities.pages[id];
    const parents: string[] = [];

    while (page?.parentId) {
      const parent = getParentPage(page);
      parent?.id && parents.push(parent.id);
      page = parent ? getPageById(parent.id) : undefined;
    }

    return parents;
  };

  const getParentPage = (page: ITocPage): ITocPage | undefined => {
    return data?.entities.pages[page.parentId];
  };

  return <TocDataContext.Provider value={ { data, isLoading, getPagesBySearchText, getPageById, getAnchorByHash, getAnchorById, getPageParentsIds } } {...props} />;
};

export { TocDataProvider, useTocData };
