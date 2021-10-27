package com.fernandan.backend.mapper;


import com.fernandan.backend.dto.PostDTO;
import com.fernandan.backend.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
    public interface PostMapper {
        PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

        Post toModel(PostDTO personDTO);

        PostDTO toDTO(Post person);
    }

