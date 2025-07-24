declare module '@docusaurus/Link' {
  import { ReactNode } from 'react';

  interface Props {
    to: string;
    children: ReactNode;
  }

  const Link: React.ComponentType<Props>;
  export default Link;
}

declare module '@docusaurus/useBaseUrl' {
  const useBaseUrl: (url: string) => string;
  export default useBaseUrl;
}

declare module '@docusaurus/useDocusaurusContext' {
  const useDocusaurusContext: () => any;
  export default useDocusaurusContext;
}

declare module '@theme/Layout' {
  import { ReactNode } from 'react';

  interface Props {
    children: ReactNode;
    title?: string;
    description?: string;
  }

  const Layout: React.ComponentType<Props>;
  export default Layout;
}
