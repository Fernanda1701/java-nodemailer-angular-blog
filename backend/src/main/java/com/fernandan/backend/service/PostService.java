package com.fernandan.backend.service;

import com.fernandan.backend.dto.MessageResponseDTO;
import com.fernandan.backend.dto.PostDTO;
import com.fernandan.backend.entity.Post;
import com.fernandan.backend.exception.PostNotFoundException;
import com.fernandan.backend.mapper.PostMapper;
import com.fernandan.backend.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostService {
    private PostRepository postRepository;
    private final PostMapper postMapper = PostMapper.INSTANCE;
    

    public List<PostDTO> listAll() {
        List<Post> allPeople = postRepository.findAll();
        return allPeople.stream()
                .map(postMapper::toDTO)
                .collect(Collectors.toList());
    }

    public MessageResponseDTO createPost(PostDTO postDTO) {
        Post postToSave = postMapper.toModel(postDTO);
        Post savedPost = postRepository.save(postToSave);
        return createMessageResponse(savedPost.getId(), "Created post with ID ");
    }

    public PostDTO findById(Long id) throws PostNotFoundException {
        Post post = verifyIfExists(id);
        return postMapper.toDTO(post);
    }

    public void delete(Long id) throws PostNotFoundException {
        verifyIfExists(id);
        postRepository.deleteById(id);
    }

    public MessageResponseDTO updateById(Long id, PostDTO postDTO) throws PostNotFoundException {
        verifyIfExists(id);
        Post postToUpdate = postMapper.toModel(postDTO);
        Post updatedPost = postRepository.save(postToUpdate);
        return createMessageResponse(updatedPost.getId(), "Updated post with ID ");
    }

    private Post verifyIfExists(Long id) throws PostNotFoundException {
        return postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
    }
    
    private MessageResponseDTO createMessageResponse(Long id, String message) {
        return MessageResponseDTO
                .builder()
                .message(message + id)
                .build();
    }
}
