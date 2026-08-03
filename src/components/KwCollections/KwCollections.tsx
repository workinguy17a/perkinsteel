"use client";

import { useState } from "react";

import KwCollectionSlider from "./KwCollectionSlider";
import collections from "./collections";


export default function KwCollections() {

  return (
    <section className="kw-collection">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                <KwCollectionSlider collections={collections} />        
            </div>
        </div>
    </section>
  );
}