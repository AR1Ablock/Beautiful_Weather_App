<template>
  <div class="loading">
    <div class="loadingdiv"></div>
  </div>

  <div class="container">
    <video autoplay loop muted class="bgvideo" :src="ChangeBackgroundVideo()">
    </video>

    <div class="weatherDetails">
      <div>
        <span class="bgtemp"> {{ CuttentTemp }}° </span>
        <span class="bgcondition"> {{ CuttentConditionMessage }} </span>
      </div>

      <div class="Date">
        <p> <span> <img src="./assets/icons/calendar.png" alt=""> </span> {{ currenWeekDay }} {{ currenDate }},
          {{ currenMonth }}</p>
      </div>

      <div class="hourlytime">

        <div v-for="(item, index) in hourlyTempArray" :key="index">
          <p>{{ item.time }}</p>
          <div class="img">
            <img :src="ChangeImage(item.summary, item.unixtime)" alt="">
          </div>
          <p>{{ item.temp }}°C</p>
        </div>

      </div>

    </div>

    <div class="start">
      <p class="cityname"> <span> <img src="./assets/icons/location.png" alt=""> </span> {{ CityLocation }}</p>
      <div class="inputSearchCntrylistCon"> <input type="text" name="search" class="SearchInput" v-model="setinput">
        <div class="loading2" v-if="MultipleCountries">
          <div class="loadingdiv"></div>
        </div>
        <div class="showhide" v-if="MultipleCountries">
          <div class="locationslist" :class="{'hoveredItem' : index == selected}" v-for="(item, index) in MultipleCountries" :key="index"
            @click="GettingCoordFromLocations(item.lat, item.lon, item.CountryName, item.ProviceName, item.CityName, index)">
            <p>{{ item.CountryName }}, {{ item.ProviceName }}, {{ item.CityName }}</p>
          </div>
        </div>

        <button class="SearchBtn" @click="GetName()">Search</button>
      </div>
      <button class="LocationBtn" @click="GettingCurrentLocation()"> <span>⦿</span></button>
    </div>

    <div class="wrapper"> <!-- Wrapper Start -->

      <div class="smallPanel"> <!-- Small Panel Start -->

        <div class="smallPanel_1">
          <h2>Now</h2>
          <h1> {{ CuttentTemp }}°C <span> <img :src="ChangeImage(CuttentConditionMessage, undefined)" alt=""> </span> </h1>
          <div>
            <p> <span> <img src="./assets/icons/calendar.png" alt=""> </span> {{ currenWeekDay }} {{ currenDate }},
              {{ currenMonth }}</p>
            <p> <span> <img src="./assets/icons/location.png" alt=""> </span>{{ Country }}, {{ Province }}, {{ CityLocation }}
            </p>
          </div>
        </div>

        <h3 class="SmallPanelHeading">Weekly Forcast</h3>

        <div class="smallPanel_2">

          <div class="day" v-for="(item, index) in WeekyDaysTempArray" :key="index">
            <h2> <p>{{item.rainChances}}%</p>  <span> <img :src="ChangeImage(item.Condition, undefined)" alt=""> </span> {{ item.temp }}°C</h2>
            <p class="WeekDay">{{ item.Date }} {{ item.Month }}</p>
            <p>{{ item.Day }}</p>
          </div>


        </div>

      </div> <!-- Small Panel End -->


      <div class="SecondLastBigPanel"> <!-- Big Panel Start -->

        <h1 class="BigPanelHeading">Today Highlights</h1>

        <div class="Wind_Sun_Humi_Pressure">


          <div class="WHSP_Parts_1"> <!-- Piece 1 -->

            <div class="airindex">
              <p>Air Index Quality</p>
              <p class="good" :class="AirQualityIndexColor()">{{ AirQualityIndex() }}</p>
            </div>

            <div class="airindex_info">
              <span><img src="./assets/icons/wind.png" alt=""></span>
              <div>
                <p>SO₂</p>
                <h1 @click="ShowUnit = !ShowUnit">{{ AirQuality.SO2 }}<span v-if="ShowUnit">µg/m³</span></h1>
              </div>
              <div>
                <p>NO₂</p>
                <h1 @click="ShowUnit = !ShowUnit">{{ AirQuality.NO2 }}<span v-if="ShowUnit">µg/m³</span></h1>
              </div>
              <div>
                <p>O₃</p>
                <h1 @click="ShowUnit = !ShowUnit">{{ AirQuality.O3 }}<span v-if="ShowUnit">µg/m³</span></h1>
              </div>
            </div>

          </div>


          <div class="WHSP_Parts_2"> <!-- Piece 2 -->

            <div class="SunRise">
              <div>
                <div>
                  <p>SunRise</p>
                  <h1><img src="./assets/icons/sunrise.png" alt="">{{ SunRise }}</h1>
                </div>
              </div>
            </div>

            <div class="SunSet">
              <div>
                <div>
                  <p>SunSet</p>
                  <h1><img src="./assets/icons/sunset.png" alt="">{{ SunSet }}</h1>
                </div>
              </div>
            </div>

          </div>


          <div class="WHSP_Parts"> <!-- Piece 3 -->

            <div>
              <p>Humidity</p>
              <div>
                <h1> <img src="./assets/icons/humidity.png" alt=""> {{ CuttentHumidity }} %</h1>
              </div>
            </div>

            <div>
              <p>Pressure</p>
              <div>
                <h1> <img src="./assets/icons/AirPressure.png" alt=""> {{ CuttentPressure }} hPa </h1>
              </div>
            </div>

          </div>


          <div class="WHSP_Parts" style="background-color: cornflowerblue;"> <!-- Piece 4 -->

            <div>
              <p>Visibility</p>
              <div>

                <h1><img src="./assets/icons/visibility.png" alt=""> {{ CuttentVisibility }} km</h1>
              </div>
            </div>

            <div>
              <p>Feels Like</p>
              <div>
                <h1> <img src="./assets/icons/feelsLike.png" alt=""> {{ CuttentFeelsLike }}°C</h1>
              </div>
            </div>

          </div>


        </div>

        <h2 class="TimesHeading">Wind Speed</h2>

        <div class="times"> <!-- Times Start -->

          <div class="timesPart3 relocate_1st_Part"> <!-- Piece 7 -->

            <div class="windDiv">
              <p>Today</p>
              <div class="img">
                <img src="./assets/icons/WindDirection.png" alt="">
              </div>
              <p>{{ CuttentWindSpeed }} km</p>
            </div>

            <div v-for="(item, index) in WeekyDaysTempArray" :key="index" class="windDiv">
              <p>{{ item.Day }}</p>
              <div class="img">
                <img src="./assets/icons/WindDirection.png" alt="">
              </div>
              <p>{{ item.Wind }} km</p>
            </div>

          </div>

        </div> <!-- times end -->

      </div> <!-- Second BigPanel End -->

    </div> <!-- Wrapper end -->
  </div>
</template>

<style scoped> @import url(./style.css);
</style>

<script setup>
import { ref } from 'vue';
let ShowUnit = ref(false);
import { setinput, GetName, hourlyTempArray, ChangeImage, CuttentConditionMessage, CuttentFeelsLike, CuttentHumidity, CuttentPressure, CuttentTemp, CuttentVisibility, CuttentWindSpeed, currenDate, currenWeekDay, currenMonth, CityLocation, Province, Country, SunRise, SunSet, WeekyDaysTempArray, AirQuality, AirQualityIndex, AirQualityIndexColor, GettingCurrentLocation, ChangeBackgroundVideo, MultipleCountries, GettingCoordFromLocations, selected } from './logic';
</script>