import React from "react";

import { promotionTag } from "@/data/content";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

const PromoTag = () => {
  return (
    <div className='relative h-full space-y-10 rounded bg-primary bg-[url("/assets/images/bgPromo.png")] bg-cover bg-[200px] bg-no-repeat p-5 text-white'>
      <h1 className="text-[40px] font-medium" style={{ lineHeight: "1em" }}>
        {promotionTag.heading}
      </h1>
      <p className="w-[90%]">{promotionTag.description}</p>
      <ButtonSecondary
        className="rounded-none bg-white text-primary"
        sizeClass="px-5 py-4"
      >
        Event details
      </ButtonSecondary>
    </div>
  );
};

export default PromoTag;
