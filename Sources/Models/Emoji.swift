//
//  Untitled.swift
//  Smile
//
//  Created by Ian MacCallum on 10/21/24.
//  Copyright © 2024 Fantageek. All rights reserved.
//

public struct Emoji: Codable, Identifiable, Hashable {
  public var id: String {
    value
  }

  public var value: String
  public var description: String?
  public var aliases: [String]?
  public var tags: [String]?

  public init(value: String, description: String? = nil, aliases: [String]? = nil, tags: [String]? = nil) {
    self.value = value
    self.description = description
    self.aliases = aliases
    self.tags = tags
  }
}
