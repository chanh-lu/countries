import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";

const PageCover = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image">
          <img src={props.img} alt="test" />
        </div>
        <div className="page-text">{props.name}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

function Book() {
  const bookRef: any = useRef(null);

  const nextButtonClick = () => {
    bookRef.flipBook.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    bookRef.flipBook.pageFlip().flipPrev();
  };

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
        onChangeOrientation={bookRef.onChangeOrientation}
        onChangeState={bookRef.onChangeState}
        className="demo-book"
        ref={(el) => (bookRef.flipBook = el)}
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
        <Page
          number={1}
          country={{ img: "https://google.com", name: "name" }}
        ></Page>
        <Page number={2}>Lorem ipsum...</Page>
        <Page number={3}>Lorem ipsum...</Page>
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
