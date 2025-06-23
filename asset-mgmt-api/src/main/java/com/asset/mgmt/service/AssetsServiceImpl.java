package com.asset.mgmt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asset.mgmt.entity.AssetCategory;
import com.asset.mgmt.entity.AssetStatus;
import com.asset.mgmt.entity.Assets;
import com.asset.mgmt.entity.Users;
import com.asset.mgmt.repo.AssetCategoryRepository;
import com.asset.mgmt.repo.AssetStatusRepository;
import com.asset.mgmt.repo.AssetsRepository;
import com.asset.mgmt.repo.UserRepository;
import com.asset.mgmt.util.AssetRequestDto;

import jakarta.transaction.Transactional;

@Service
public class AssetsServiceImpl implements AssetsService{
	
	    @Autowired
         private UserRepository userRepo;

		@Autowired
		private AssetCategoryRepository categoryRepo;

		@Autowired
		private AssetStatusRepository statusRepo;

	@Autowired
	private AssetsRepository assetsRepo;

	@Override
	public List<Assets> getAllAssets() {
		return assetsRepo.findAll();
	}

	@Override
	public Assets getAssetById(Integer id) {
		return assetsRepo.findById(id).get();
	}
	
	@Override
	public Page<Assets> getAllAssetsByUserId(Integer userId, int page, int size) {
	    Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
	    return assetsRepo.findByUserId(userId, pageable);
	}

	// @Override
	// @Transactional
	// public Assets addAsset(Assets asset) {
	// 	return assetsRepo.save(asset);
	// }

	@Override
@Transactional
public Assets addAsset(AssetRequestDto dto) {
    // ✅ 1. Fetch user by ID sent from frontend
    Users user = userRepo.findById(dto.getUserId())
        .orElseThrow(() -> new RuntimeException("User not found"));

    // ✅ 2. Fetch category and status
    AssetCategory category = categoryRepo.findById(dto.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));

    AssetStatus status = statusRepo.findById(dto.getStatusId())
        .orElseThrow(() -> new RuntimeException("Status not found"));

    // ✅ 3. Map and save
    Assets asset = new Assets();
    asset.setUser(user);
    asset.setAssetName(dto.getAssetName());
    asset.setCategory(category);
    asset.setStatus(status);
    asset.setAssetImageUrl(dto.getImageUrl());

    // 👉 Now directly use LocalDate (no need to parse)
    if (dto.getPurchaseDate() != null) {
        asset.setPurchaseDate(dto.getPurchaseDate().atStartOfDay());
    }

    if (dto.getWarrantyExpiryDate() != null) {
        asset.setWarrantyExpiryDate(dto.getWarrantyExpiryDate().atStartOfDay());
    }

    return assetsRepo.save(asset);
}

	@Override
	@Transactional
	public boolean updateAsset(Assets asset) {
		if(assetsRepo.existsById(asset.getId())) {
			assetsRepo.save(asset);
			return true;
		}
		return false;
	}

	@Override
	@Transactional
	public boolean deleteAsset(Integer id) {
		if(assetsRepo.existsById(id)) {
			assetsRepo.deleteById(id);
			return true;
		}
		return false;
	}
	
}
