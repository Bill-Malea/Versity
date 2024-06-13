import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 lg:p-20 lg:text-l">
      <div className="flex flex-col lg:flex-row bg-white p-10">
        <img
          src="/assets/images/stones.png"
          className="sm:w-auto lg:w-64 h-36 object-contain mb-4 rounded-md"
        />
        <div>
          <div className=" text-xl lg:text-3xl ">LINGSTON AVOMBA CHILUKA</div>
          {/*  */}
          <div className="flex flex-row mt-5">
            <h1 className="mr-1 text-cyan-600 font-semibold">EXPERTISE:</h1>
            <h1>Fact-Checking, General Web Research, Editing</h1>
          </div>
          {/*  */}

          <div className="flex flex-row mt-2">
            <h1 className="mr-1 text-cyan-600 font-semibold">CURRENTLY:</h1>
            <h1>Fact Checker and Web Researcher | Investing.com</h1>
          </div>
          {/*  */}

          <div className="flex flex-row mt-2">
            <h1 className="mr-1 text-cyan-600 font-semibold">EDUCATION:</h1>
            <h1>
              Bachelor of Applied Science (BASc), Nutrition and Dietetics |
              University of Eldoret, Kenya, Master of Science in Project
              Management (MSPM), Public Administration | United States
              International University Africa (USIU)
            </h1>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mt-5 mb-5">Experience</h1>
      <p className="text-gray-700 mb-4 ">
        Lingston Chiluka is a B2B writer who creates consumer articles on
        various topics. He is passionate about writing, entrepreneurship, and
        philanthropy. He has worked as a content, a ghostwriter, a copywriter,
        and a medium writer. He has written grant proposals, research papers,
        books, blogs, and articles for organizations, authors, and brands. He
        has produced high-quality and creative content for different clients and
        platforms. He has also worked as a freelance content writer and manager
        on Upwork. He has delivered content for various projects and clients on
        finance, business, marketing, and health topics. He has used various
        tools and techniques to optimize his content for SEO and readability. He
        has also worked as a copywriter for Ecohubmap and a fact checker and
        general web researcher for ACero Digital. He has written engaging and
        informative content for an environmental website and verified
        information related to construction and engineering. He has used various
        sources and methods to check the accuracy and reliability of data and
        facts. He joined Investing.com in 2024 as a fact checker and general web
        researcher. He verifies the information related to financial markets,
        economic trends, and investment opportunities. He also conducts online
        research on various topics and issues that are relevant to the investing
        community
      </p>
    </div>
  );
};

export default About;
