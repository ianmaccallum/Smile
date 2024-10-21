//
//  Category.swift
//  Smile
//
//  Created by Ian MacCallum on 10/21/24.
//  Copyright © 2024 Fantageek. All rights reserved.
//

import Foundation

public struct Category: Codable, Identifiable {
  public var id: String {
    name
  }

  public let name: String
  public let emojis: [Emoji]
}
