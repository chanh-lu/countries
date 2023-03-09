import { useEffect, useRef, useState } from "react";
import { Country } from "../types/Country";
import { ICountryController } from "../api/ICountryController";
import React from "react";
import HTMLFlipBook from "react-pageflip";

const PageCover = React.forwardRef((props: any, ref: any) => (
  <div className="page page-cover" ref={ref} data-density="hard">
    <div className="page-content">
      <h2>{props.children}</h2>
    </div>
  </div>
));

const Page = React.forwardRef(
  (props: { number: number; country: Country }, ref: any) => (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="page-image">
          <img src={props.country.flagUrl} alt={props.country.flagAlt} />
        </div>
        <h2 className="page-header">{props.country.officialName}</h2>
        <div className="page-text">{props.country.name}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  )
);

export function CountryList({
  controller,
}: {
  controller: ICountryController;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  const currentRef: any = useRef(null);

  const nextButtonClick = () => {
    currentRef.flipBook.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    currentRef.flipBook.pageFlip().flipPrev();
  };

  useEffect(() => {
    (async () => {
      let data: Country[] = JSON.parse(
        sessionStorage.getItem("countries") ?? "[]"
      );

      if (!data || data.length === 0) {
        data = await controller.getAllAsync();
        sessionStorage.setItem("countries", JSON.stringify(data));
        console.info("Fetched data from API");
      }

      setCountries(data);
    })();
  }, [controller]);

  return (
    <div>
      <HTMLFlipBook
        width={550}
        height={733}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onChangeOrientation={currentRef.onChangeOrientation}
        onChangeState={currentRef.onChangeState}
        className="demo-book"
        ref={(el) => (currentRef.flipBook = el)}
        style={{}}
        startPage={0}
        drawShadow={false}
        flippingTime={1}
        usePortrait={false}
        startZIndex={0}
        autoSize={false}
        clickEventForward={false}
        useMouseEvents={false}
        swipeDistance={0}
        showPageCorners={false}
        disableFlipByClick={false}
      >
        <PageCover>BOOK TITLE</PageCover>
        {countries.map((country, index) => (
          <Page number={index} country={country}></Page>
        ))}

        <PageCover>THE END</PageCover>
      </HTMLFlipBook>

      <div className="container">
        <div>
          <button type="button" onClick={prevButtonClick}>
            Previous page
          </button>
          <button type="button" onClick={nextButtonClick}>
            Next page
          </button>
        </div>
      </div>
    </div>
  );
}
