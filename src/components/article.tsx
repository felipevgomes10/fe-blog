import { CodeBlock } from "./code-block";

type ArticleProps = {
  slug: string;
};

const mockedCode = `
import React from "react";

type TestProps = {};

export function Test(props: TestProps) {
    return <p>Hello world</p>;
}     
`;

export function Article({ slug }: Readonly<ArticleProps>) {
  return (
    <div className="m-auto h-full">
      {slug}
      <article className="prose lg:prose-xl prose-slate dark:prose-invert">
        <h1>Titulo</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
          accusamus esse, inventore laudantium molestias quis, illo minus
          impedit excepturi possimus ipsa sit nihil ipsum sint totam doloremque
          dicta voluptatum voluptate?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo,
          reiciendis quaerat! Architecto commodi asperiores veniam voluptas rem
          voluptate facilis? Vel qui similique natus adipisci voluptas corrupti
          dolorum unde ut facilis.
        </p>
        <blockquote>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut
          quidem amet quas, omnis voluptatem ex reprehenderit nobis? Accusantium
          accusamus, sed veniam laboriosam recusandae autem doloribus
          dignissimos cumque officiis expedita?
        </blockquote>

        <CodeBlock code={mockedCode} />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          dolores libero deserunt. Et assumenda excepturi molestiae officiis
          tenetur hic soluta quod quo ipsum. Accusamus quas nobis, hic nostrum
          placeat beatae?
        </p>

        <CodeBlock code={mockedCode} />
      </article>
    </div>
  );
}
