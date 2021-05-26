import React, { useEffect } from 'react';
import { ITocData } from '@/types/toc';

type State = {
  data: ITocData | null;
  isLoading: boolean;
}

const TocDataContext = React.createContext<State | undefined>(undefined);

const useTocData = (): State => {
  const context = React.useContext(TocDataContext);

  if (!context) {
    throw new Error('asd');
  }

  return context;
};

const TocDataProvider: React.FC = (props) => {
  const [data, setData] = React.useState<ITocData | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    fetch('/data/HelpTOC.json')
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);

        return response.json();
      })
      .then((result: ITocData) => setData(result))
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return <TocDataContext.Provider value={ { data, isLoading } } {...props} />;
};

export { TocDataProvider, useTocData };
