package com.asset.mgmt.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.asset.mgmt.entity.Assets;
import com.asset.mgmt.util.AssetRequestDto;

public interface AssetsService {

	List<Assets> getAllAssets();

	Page<Assets> getAllAssetsByUserId(Integer userId, int page, int size);

	Assets getAssetById(Integer id);

	Assets addAsset(AssetRequestDto dto); // ✅ updated

	boolean updateAsset(Assets asset);

	boolean deleteAsset(Integer id);
}
