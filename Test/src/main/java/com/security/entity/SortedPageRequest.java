package com.security.entity;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

	public class SortedPageRequest {
	    private int pageNumber;
	    private int pageSize;
	    private String sortBy;
	    private String direction;

	    public SortedPageRequest(int pageNumber, int pageSize, Sort.Direction direction, String sortBy) {
	        this.pageNumber = pageNumber;
	        this.pageSize = pageSize;
	        this.sortBy = sortBy;
	        this.direction = direction.name().toLowerCase();
	    }

	    public SortedPageRequest() {
	        
	    }
	    public PageRequest toPageRequest() {
	        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
	        return PageRequest.of(pageNumber, pageSize, sort);
	    }

		public int getPageNumber() {
			return pageNumber;
		}

		public void setPageNumber(int pageNumber) {
			this.pageNumber = pageNumber;
		}

		public int getPageSize() {
			return pageSize;
		}

		public void setPageSize(int pageSize) {
			this.pageSize = pageSize;
		}

		public String getSortBy() {
			return sortBy;
		}

		public void setSortBy(String sortBy) {
			this.sortBy = sortBy;
		}

		public String getDirection() {
			return direction;
		}

		public void setDirection(String direction) {
			this.direction = direction;
		}

	    
	}

