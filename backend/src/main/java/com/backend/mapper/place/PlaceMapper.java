package com.backend.mapper.place;

import com.backend.domain.place.Place;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface PlaceMapper {
    @Insert("""
            INSERT INTO Place (placeName, placeUrl, address, category, latitude, longitude)
            VALUES (#{placeName}, #{placeUrl}, #{address}, #{category}, #{latitude}, #{longitude})
            """)
    int insert(Place place);
}