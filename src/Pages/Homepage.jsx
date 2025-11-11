import React from 'react'
import Hero from '../components/Home/Hero/Hero'
import CategoryBoxes from '../Components/Home/CategoryBoxes/CategoryBoxes'
import NewArrivals from '../Components/Home/NewArrivals/NewArrivals'
import TrendingCategories from '../Components/Home/TrendingCategories/TrendingCategories'
import LatestCollections from '../Components/Home/LatestCollections/LatestCollections'
import SiteStats from '../Components/Home/SiteStats/SiteStats'
import StayHomeSection from '../Components/Home/StayHomeSection/StayHomeSection'
import ShopFeatures from '../Components/Home/ShopFeatures/ShopFeatures'

const HomePage = () => {
  return (
    <>
    <Hero />
    <CategoryBoxes />
    <NewArrivals />
    <TrendingCategories />
   <LatestCollections />
   <SiteStats />
   <StayHomeSection />
   <ShopFeatures />

    </>
  )
}

export default HomePage