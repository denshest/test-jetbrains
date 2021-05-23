interface ITocPage {
  id: string,
  title: string,
  url: string,
  level: number,
  parentId: string,
  pages: string[],
  anchors: string[],
  tabIndex: number,
  disqus_id: string,
}

interface ITocAnchor {
  id: string,
  title: string,
  url: string,
  level: number,
  anchor: string,
  parentId: string,
  disqus_id: string,
}

interface ITocData {
  entities: {
    pages: {
      [id: string]: ITocPage
    },
    anchors: {
      [id: string]: ITocAnchor
    }
  },
  topLevelIds: string[]
}

