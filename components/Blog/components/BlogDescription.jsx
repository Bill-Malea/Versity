/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';

const BlogDescriptionPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const blogPost = {
    id: postId,
    title: 'Sample Blog Post',
    image: 'https://margaretbourne.com/wp-content/uploads/2022/06/July-Blog-Post-Ideas.jpg',
    content: `
       This is the content of the sample blog post. You can include formatted HTML content here.
      Feel free to replace this with the actual content of your blog post.
    `,
    largerText: `
      Exploring Larger Text Section

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet ex eu metus semper 
      ullamcorper. Curabitur sagittis massa ut urna fermentum, nec fringilla velit tristique. 
      Integer tincidunt vestibulum nunc, a tincidunt mauris feugiat nec.

      Fusce euismod elit sit amet libero pellentesque, non rhoncus nunc tincidunt. Nulla facilisi. 
      Etiam aliquet velit ut est scelerisque, ac aliquam velit interdum. Suspendisse in mauris 
      augue. Donec id odio in sem tristique feugiat.

      Vivamus vel mi in ligula convallis finibus at a massa. Nunc et justo eget dolor bibendum 
      tempor vitae sit amet elit. Nam et quam eu dui pharetra posuere.

      Integer bibendum, orci eu commodo consectetur, odio sem malesuada tortor, vel scelerisque 
      nulla libero ac dui. Vestibulum sed turpis nec tortor sagittis aliquet eu at neque. Sed 
      nec justo quis libero eleifend fermentum eu non risus.

      Nullam feugiat, turpis ac laoreet fermentum, felis odio tristique justo, ut feugiat mi 
      ligula ac libero. Phasellus pharetra quam nec augue finibus bibendum. Integer eu turpis 
      sit amet nisi ultricies eleifend at non ligula. <a href="https://example.com" target="_blank" rel="noopener noreferrer"><strong>Aliquam ultricies efficitur nibh</strong></a>, in 
      commodo erat fermentum ut.
    `,
  };

  return (
    <div className="lg:mx-40 mx-5 my-5">
      <h2 className="text-3xl font-semibold mb-4">{blogPost.title}</h2>
      <img
        src={blogPost.image}
        alt={blogPost.title}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <p>{blogPost.content}</p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Larger Text Section</h2>
        <div dangerouslySetInnerHTML={{ __html: blogPost.largerText }} />
      </div>
    </div>
  );
};

export default BlogDescriptionPage;
