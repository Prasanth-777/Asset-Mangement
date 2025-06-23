package com.asset.mgmt.util;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AssetRequestDto {
    private Integer userId;
    private String assetName;
    private Integer categoryId;
    private Integer statusId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate purchaseDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate warrantyExpiryDate;

    private String imageUrl;

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }

  public LocalDate getPurchaseDate() {
    return purchaseDate;
}

public void setPurchaseDate(LocalDate purchaseDate) {
    this.purchaseDate = purchaseDate;
}

public LocalDate getWarrantyExpiryDate() {
    return warrantyExpiryDate;
}

public void setWarrantyExpiryDate(LocalDate warrantyExpiryDate) {
    this.warrantyExpiryDate = warrantyExpiryDate;
}


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
