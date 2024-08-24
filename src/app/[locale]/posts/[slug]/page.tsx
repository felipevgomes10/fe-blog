type PostProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return [];
}

export default function Post({ params: { slug } }: PostProps) {
  return <p>{slug}</p>;
}
